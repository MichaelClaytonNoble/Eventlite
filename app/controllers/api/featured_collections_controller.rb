class Api::FeaturedCollectionsController < ApplicationController

  def index
    @fc = FeaturedCollection.all
    render :featured_collection_list
  end
end
