class CreateCities < ActiveRecord::Migration
  def change
    create_table :cities do |t|
      t.string :name
      t.integer :state_id
      t.integer :metropoly_id

      t.timestamps
    end
  end
end
