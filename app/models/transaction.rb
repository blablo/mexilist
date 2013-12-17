class Transaction < ActiveRecord::Base
  attr_accessible :paquete, :amount, :status
end
