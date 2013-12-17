class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :number
      t.string :fname
      t.string :lname
      t.string :exp_date
      t.string :card_type
      t.integer :user_id
      t.string :last_number

      t.timestamps
    end
  end
end
