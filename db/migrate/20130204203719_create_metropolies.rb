class CreateMetropolies < ActiveRecord::Migration
  def change
    create_table :metropolies do |t|
      t.string :name

      t.timestamps
    end
  end
end
