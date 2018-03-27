class AuctionSerializer < ActiveModel::Serializer
  attributes :id, :item, :description, :reserve, :max_bid, :end_date

  belongs_to :user, key: :host
class UserSerializer < ActiveModel::Serializer
  attributes(
    :id, :first_name, :last_name,
    :full_name, :created_at, :updated_at
  )
end

  has_many :bids
   class BidSerializer < ActiveModel::Serializer
     attributes :price, :id, :created_at, :updated_at, :bidder, :created

     def bidder
       object.user&.full_name
     end

     def created
       object.created_at.strftime("%B %d, %Y")
     end

   end

   def max_bid
     object.bids&.maximum("price")
   end

end
