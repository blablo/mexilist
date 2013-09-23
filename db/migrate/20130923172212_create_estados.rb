class CreateEstados < ActiveRecord::Migration
  def change
    create_table :estados do |t|
      t.integer :id
      t.string :name

      t.timestamps
    end
  end
end
