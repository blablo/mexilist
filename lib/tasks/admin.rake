namespace :admin do
  desc "state"
  task :add_state => :environment do
    Anuncio.all.each do |a|
      a.state_id = a.city.state_id
      a.save
    end
  end
end
