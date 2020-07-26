require 'roda'
require 'openid_connect'

class O365 < Roda
  plugin :halt
  plugin :middleware

  route do |r|
    # user is authenticating using Office 365
    r.on 'o365' do
      r.get 'login' do 
        # You have to use the "common" provider if you want users outside your
        # tenant domain: My tenant is netgrok.org but users are in westpoint.edu. 
        # 
        # Since auth responses will come from another tenant - not common - 
        # the common discovery URLS have a {tenantid} interpolation variable
        # that breaks issuer validation. 
        # 
        # So I do discovery like this to bypass issuer validation. In this instance
        # it's not a security risk, it's just super-annoying. 
        #
        # Alternatively, I could fetch the discovery variables myself, interpolate
        # westpoint.edu's tenantid, before giving it to Discovery::Provider::Config 
        # but that seems like a LOT more work ¯\_(ツ)_/¯
        discover = OpenIDConnect::Discovery::Provider::Config::Resource.new(
          URI(ENV['OPENID_COMMON_PROVIDER'])
        ).discover!

        client = OpenIDConnect::Client.new(
          identifier: ENV['OPENID_CLIENT_ID'],
          secret: ENV['OPENID_CLIENT_SECRET'],
          redirect_uri: "https://#{env['HTTP_HOST']}/o365/callback",
          authorization_endpoint: discover.authorization_endpoint,
          token_endpoint: discover.token_endpoint,
          userinfo_endpoint: discover.userinfo_endpoint
        )

        r.redirect client.authorization_uri(
          state: nonce,
          nonce: nonce,
          scope: [:profile, :email]
        )
      end
    end

    r.get 'callback' do
      # use the tenant provider since that's who actually sends auth responses
      # we can use regular discovery since we're just validating the response
      discover = OpenIDConnect::Discovery::Provider::Config.discover!(
        ENV['OPENID_TENANT_PROVIDER']
      )

      client = OpenIDConnect::Client.new(
        identifier: ENV['OPENID_CLIENT_ID'],
        secret: ENV['OPENID_CLIENT_SECRET'],
        redirect_uri: "https://#{env['HTTP_HOST']}/o365/callback",
        authorization_endpoint: discover.authorization_endpoint,
        token_endpoint: discover.token_endpoint,
        userinfo_endpoint: discover.userinfo_endpoint
      )
      
      client.authorization_code = r.params['code']
      access_token = client.access_token!
      
      id_token = OpenIDConnect::ResponseObject::IdToken.decode(
        access_token.id_token, 
        discover.jwks
      )
      
      id_token.verify!({
        nonce: nonce,
        issuer: discover.issuer,
        client_id: ENV['OPENID_CLIENT_ID']
      })
      
      email = access_token.userinfo!.email
      

      # this hackery tell Roda to call the next app in 
      # the middleware stack, which is either gadget or chat 
      throw :next, true      
    rescue => ex
      r.halt 401, ex.message.gsub("\n", "<br>")
    end
  end
end