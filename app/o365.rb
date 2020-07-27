require 'roda'
require 'securerandom'
require 'openid_connect'

class O365 < Roda
  plugin :halt
  plugin :middleware
  plugin :param_matchers
  plugin :render, engine: 'slim'

  # You have to use the "common" provider if you want users outside your
  # tenant domain: My tenant is netgrok.org but users are in westpoint.edu. 
  # 
  # auth responses will come from another tenant - not common - so 
  # the common discovery URLs have an annoying {tenantid} interpolation 
  # variable in them that breaks issuer validation. 
  # 
  # So I do discovery like this to bypass issuer validation. It's not a 
  # security risk, it's just super-annoying. ¯\_(ツ)_/¯
  discover = OpenIDConnect::Discovery::Provider::Config::Resource.new(
    URI(ENV['OPENID_COMMON_PROVIDER'])
  ).discover!

  route do |r|
    r.get 'logout' do 
      session.clear
      r.redirect discover.end_session_endpoint
    end

    r.on 'o365' do
      client = OpenIDConnect::Client.new(
        identifier: ENV['OPENID_CLIENT_ID'],
        secret: ENV['OPENID_CLIENT_SECRET'],
        redirect_uri: "https://#{env['HTTP_HOST']}/o365/callback",
        authorization_endpoint: discover.authorization_endpoint,
        token_endpoint: discover.token_endpoint,
        userinfo_endpoint: discover.userinfo_endpoint
      )

      r.get 'login', param: 'return' do |path|
        session.clear
        session['return'] = path
        session['nonce'] = SecureRandom.uuid

        r.redirect client.authorization_uri(
          state: session['nonce'],
          nonce: session['nonce'],
          scope: [:profile, :email],
          # prevents users from signing in with a non-westpoint.edu account
          domain_hint: 'westpoint.edu'
        )
      end

      r.get 'callback' do
        begin
          client.authorization_code = r.params['code']
          access_token = client.access_token!
          
          id_token = OpenIDConnect::ResponseObject::IdToken.decode(
            access_token.id_token, 
            discover.jwks
          )
          
          id_token.verify!({
            nonce: session.delete('nonce'),
            client_id: ENV['OPENID_CLIENT_ID'],
            # responses come from the westpoint.edu tenant, not common
            # if you ever get an "issuer doesn't match error", it's because
            # 1) A user somehow logged in with another Microsoft account or
            # 2) West Point's Azure AD Tenant ID changed. 
            issuer: ENV['OPENID_TENANT_PROVIDER']
          })

        rescue => ex
          r.halt 401, render(:card, locals: {
            title: '¯\_(ツ)_/¯', 
            text: ex.message.gsub("\n", "<br>")
          })
        end

        email = access_token.userinfo!.email
        session.update API.userinfo(email)

        # return the user to where ever they were originally headed 
        r.redirect session.delete('return')
      end
    end
  end
end