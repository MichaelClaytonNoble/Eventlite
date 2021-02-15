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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_02_15_033947) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "events", force: :cascade do |t|
    t.string "title", null: false
    t.text "description"
    t.integer "category_id", null: false
    t.string "location", null: false
    t.string "address"
    t.string "venue"
    t.boolean "recurring", null: false
    t.datetime "start", null: false
    t.datetime "end", null: false
    t.string "timezone", null: false
    t.integer "creator_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "about"
    t.index ["category_id"], name: "index_events_on_category_id"
    t.index ["creator_id"], name: "index_events_on_creator_id"
    t.index ["location"], name: "index_events_on_location"
    t.index ["title"], name: "index_events_on_title"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "session_token", null: false
    t.string "password_digest", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
