class AddTokenToPicture < ActiveRecord::Migration
  def change
    add_column :pictures, :token, :integer
  end
end
