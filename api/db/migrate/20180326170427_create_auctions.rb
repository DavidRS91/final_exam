class CreateAuctions < ActiveRecord::Migration[5.1]
  def change
    create_table :auctions do |t|
      t.string :item
      t.string :description
      t.integer :reserve
      t.datetime :end_date
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
