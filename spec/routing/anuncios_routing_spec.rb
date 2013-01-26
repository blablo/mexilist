require "spec_helper"

describe AnunciosController do
  describe "routing" do

    it "routes to #index" do
      get("/anuncios").should route_to("anuncios#index")
    end

    it "routes to #new" do
      get("/anuncios/new").should route_to("anuncios#new")
    end

    it "routes to #show" do
      get("/anuncios/1").should route_to("anuncios#show", :id => "1")
    end

    it "routes to #edit" do
      get("/anuncios/1/edit").should route_to("anuncios#edit", :id => "1")
    end

    it "routes to #create" do
      post("/anuncios").should route_to("anuncios#create")
    end

    it "routes to #update" do
      put("/anuncios/1").should route_to("anuncios#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/anuncios/1").should route_to("anuncios#destroy", :id => "1")
    end

  end
end
