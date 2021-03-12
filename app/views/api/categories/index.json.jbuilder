
@categories.each do |category|
  json.set! category.id do 
    json.partial! "category_info", category: category
  end
end