class PicturesController < ApplicationController

  def create
    @picture = current_user.pictures.build(params[:picture])

    respond_to do |format|
      if @picture.save
        format.html { redirect_to @picture, notice: 'Picture was successfully created.' }
        format.js
        format.json { render json: @picture, status: :created, location: @picture }
      else
        format.html { render action: "new" }
        format.json { render json: @picture.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @picture = Picture.find(params[:id])
    @borrado_id = params[:id]
    respond_to do |format|
      if @picture.destroy
        format.js
      end
    end
  end

end
