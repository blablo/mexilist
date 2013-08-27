class CreateJobPerks < ActiveRecord::Migration
  def change
    create_table :job_perks do |t|
      t.integer :anuncio_id
      t.string :area
      t.string :estudios
      t.string :cv

      t.timestamps
    end
  end
end
