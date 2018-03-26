class AuctionsController < ApplicationController


  before_action :authenticate_user!
   before_action :find_auction, only: [:show, :update, :destroy]
   # before_action :authorize_user!, except: [:index, :show]

   def index
     render json: Auction.order(:id)
   end

   def show
     render json: @auction
   end

   def create
     auction = Auction.new auction_params
     auction.save!
     render json: auction
   end

   def update
     @auction.update! auction_params
     render json: @auction
   end

   def destroy
     @auction.destroy
     render json: Auction.order(:id)
   end

   private

   def auction_params
     params.require(:auction).permit(:item, :description, :reserve, :end_date)
   end

   def find_auction
     @auction = Auction.find_by!(id: params[:id])
   end

   # def authorize_user!
   #   unless can?(:manage, :all)
   #     #
   #     render(
   #       json: { errors: [{type: "Unauthorized"}] }, status: :unauthorized
   #     )
   #   end
   # end





end
