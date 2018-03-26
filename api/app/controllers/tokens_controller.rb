class TokensController < ApplicationController
  def create
  user = User.find_by(email: params[:email])

  if user&.authenticate(params[:password])
    render json: {
      jwt: encode_token({
          id: user.id,
          is_admin: user.is_admin,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          full_name: user.full_name
      })
    }
  else
    render(
      json: { errors: [{type: "NotFound"}] }, status: :not_found
    )
  end

end

end
