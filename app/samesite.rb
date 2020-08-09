require 'roda'

# this middleware makes sure that the current browser is respecting 
# the SameSite=None directive and sending cookies from within an iframe:
# https://gist.github.com/koba04/d52765516600ec51d1761bb0ce994a11
class SameSite < Roda
  plugin :halt
  plugin :middleware
  plugin :param_matchers
  plugin :render, engine: 'slim'

  route do |r|
    r.on proc { session.empty? } do 
      r.on param: 'cookie' do 
        r.halt 400, render(:card, locals: {
          title: '¯\_(ツ)_/¯', 
          text: "<b>Your browser is blocking third-party cookies!</b> If you are using Safari, you may need to disable <a href='https://support.apple.com/guide/safari/prevent-cross-site-tracking-sfri40732/mac'>cross-site tracking prevention</a>. Also make sure your browser is up-to-date and there is an exception for <b>#{env['HTTP_HOST']}</b> in any browser privacy extensions."
        })
      end

      # I'm always annoyed with how you manipulate query components in ruby ...
      redirect = URI.parse(env['PATH_INFO'])
      cookie_query = URI.decode_www_form(redirect.query || '') << ["cookie", "true"]
      redirect.query = URI.encode_www_form(cookie_query)

      session['cookie'] = true
      r.redirect redirect.to_s
    end
  end
end