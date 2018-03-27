class BidsController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_user!

  def create
    @bid = Bid.new bid_params
    @bid.user = current_user
    @bid.auction = Auction.find_by(id: params[:auction_id])
    @bid.save!
    render json: @bid.auction
  end

  def destroy
    @bid = Bid.find_by!(id: params[:id])
    @bid.destroy
    render json: @bid.auction
  end

  private

 def bid_params
   params.require(:bid).permit(:price)
 end

 def authorize_user!
   unless can?(:manage, :all)
     #
     render(
       json: { errors: [{type: "Unauthorized"}] }, status: :unauthorized
     )
   end
end

end
