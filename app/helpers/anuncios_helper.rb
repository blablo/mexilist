module AnunciosHelper

  def city_anuncio_url(anuncio)
    anuncio.city.url_name + "/" + anuncio.title.parameterize + "/" + anuncio.id.to_s
  end


  def category_list(num)
    parent=Category.find(num)
    capture_haml do
      haml_tag(:div, :class => 'category_list well') do
        haml_tag(:strong, parent.name)
        haml_concat image_tag('icons/'+parent.name.parameterize+'.png')
        haml_tag(:ul) do 
          parent.subcategories.each do |sub|
            haml_tag(:li) do 
              haml_concat link_to(sub.name, new_anuncio_url+"?sub="+sub.id.to_s+"&token="+@token)
            end
          end
        end
      end
    end

  end

end
