class AddMexipuntosToTransactions < ActiveRecord::Migration
  def change
    add_column :transactions, :mexipuntos, :integer
  end
end
