class AddTipoToCategories < ActiveRecord::Migration
  def change
    add_column :categories, :tipo, :integer
  end
end
