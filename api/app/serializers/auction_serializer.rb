class AuctionSerializer < ActiveModel::Serializer
  attributes :id, :item, :description, :reserve

  belongs_to :user, key: :host
class UserSerializer < ActiveModel::Serializer
  attributes(
    :id, :first_name, :last_name,
    :full_name, :created_at, :updated_at
  )
end

  has_many :bids
   class BidSerializer < ActiveModel::Serializer
     attributes :price, :created_at, :updated_at, :bidder

     def bidder
       object.user&.full_name
     end
   end


end
