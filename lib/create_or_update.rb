module CreateOrUpdate
  def create_or_update(options = {})
      if options.class == Array
        records = Array.new
        for option in options          
          id = option.delete(:id)
          record = find_by_id(id) || new
          record.id = id
          record.attributes = option
          record.save!              
          records << record
        end
        records
      else
        id = options.delete(:id)
        record = find_by_id(id) || new
        record.id = id
        record.attributes = options
        record.save!
        record
      end
  end
end
