  @fc.each do |collection|
    json.set! collection.id do
        json.extract! collection, :id, :title, :description, :collection_name
        if collection.image.attached?
          json.imageUrl url_for(collection.image)
        end
    end
  end