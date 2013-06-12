# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130612200011) do

  create_table "anuncios", :force => true do |t|
    t.string   "title"
    t.integer  "category_id"
    t.integer  "tipo"
    t.decimal  "price",       :precision => 10, :scale => 0
    t.date     "expiracy"
    t.date     "renovation"
    t.text     "texto"
    t.integer  "city_id"
    t.string   "district"
    t.string   "street"
    t.float    "latitude"
    t.float    "longitude"
    t.datetime "created_at",                                 :null => false
    t.datetime "updated_at",                                 :null => false
    t.string   "tel"
    t.integer  "user_id"
    t.string   "token"
  end

  create_table "assets", :force => true do |t|
    t.integer  "anuncio_id"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
    t.string   "file_file_name"
    t.string   "file_content_type"
    t.integer  "file_file_size"
    t.datetime "file_updated_at"
  end

  create_table "authentications", :force => true do |t|
    t.integer  "user_id"
    t.string   "provider"
    t.string   "uid"
    t.string   "token"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "brands", :force => true do |t|
    t.string   "name"
    t.integer  "tipo"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "car_perks", :force => true do |t|
    t.integer  "brand_id"
    t.integer  "model_id"
    t.integer  "year"
    t.float    "km"
    t.integer  "anuncio_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "categories", :force => true do |t|
    t.string   "name"
    t.boolean  "main"
    t.integer  "parent_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "tipo"
    t.string   "keywords"
  end

  create_table "cities", :force => true do |t|
    t.string   "name"
    t.integer  "state_id"
    t.integer  "metropoly_id"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  create_table "house_perks", :force => true do |t|
    t.integer  "anuncio_id"
    t.integer  "rooms"
    t.float    "m2int"
    t.float    "m2ext"
    t.string   "colonia"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "metropolies", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "models", :force => true do |t|
    t.integer  "brand_id"
    t.string   "name"
    t.integer  "tipo"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "moto_perks", :force => true do |t|
    t.integer  "anuncio_id"
    t.integer  "brand_id"
    t.integer  "year"
    t.integer  "cc"
    t.integer  "km"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "pictures", :force => true do |t|
    t.integer  "anuncio_id"
    t.string   "image"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "token"
    t.integer  "user_id"
  end

  create_table "roles", :force => true do |t|
    t.string   "name"
    t.integer  "resource_id"
    t.string   "resource_type"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "roles", ["name", "resource_type", "resource_id"], :name => "index_roles_on_name_and_resource_type_and_resource_id"
  add_index "roles", ["name"], :name => "index_roles_on_name"

  create_table "states", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.string   "name"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

  create_table "users_roles", :id => false, :force => true do |t|
    t.integer "user_id"
    t.integer "role_id"
  end

  add_index "users_roles", ["user_id", "role_id"], :name => "index_users_roles_on_user_id_and_role_id"

end
