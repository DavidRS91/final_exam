PASSWORD = 'supersecret'

User.destroy_all
Auction.destroy_all
Bid.destroy_all

super_user = User.create(
  first_name: 'Admin',
  last_name: 'User',
  email: 'admin@gmail.com',
  password: PASSWORD,
  is_admin: true
)


5.times.each do
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name

  User.create(
    first_name: first_name,
    last_name: last_name,
    email: "#{first_name.downcase}.#{last_name.downcase}@example.com",
    password: PASSWORD
  )
end

10.times.each do

a = Auction.create(
  item: Faker::Hipster.sentence,
  description: Faker::Hipster.paragraph,
  reserve: 25,
  end_date: DateTime.parse("2018-10-10"),
  user: User.all.sample
)

  if a.valid?
    10.times.each do
      b = Bid.create(
        price: 15,
        auction: a,
        user: User.all.sample
      )
    end
  end

end



# testins
users = User.all
auctions = Auction.all
bids = Bid.all

puts Cowsay.say "Created #{users.count} users", :tux
puts Cowsay.say "Created #{auctions.count} auctions", :tux
puts Cowsay.say "Created #{bids.count} bids", :tux
puts "Login as admin #{super_user.email} and password of '#{PASSWORD}'"
