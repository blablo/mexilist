class AddMexipuntosToUsers < ActiveRecord::Migration
  def change
    add_column :users, :mexipuntos, :integer, :default => 0
  end
end
