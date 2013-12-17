class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.integer :user_id
      t.integer :card_id
      t.string :auth_code
      t.string :banwire_id
      t.string :card_number
      t.string :status
      t.float :amount
      t.string :paquete

      t.timestamps
    end
  end
end
