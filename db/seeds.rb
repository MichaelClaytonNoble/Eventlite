# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all

User.create!({email: "Example.Account@demo.com", password: "123456", first_name: "Demo", last_name: "Login"}); 
User.create!({email: "000@000.000", password: "123456", first_name: "000", last_name: "000"}); 
User.create!({email: "111@111.111", password: "123456", first_name: "111", last_name: "111"}); 
User.create!({email: "222@222.222", password: "123456", first_name: "222", last_name: "222"}); 
