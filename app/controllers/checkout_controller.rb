# -*- coding: utf-8 -*-
require 'httparty'
class CheckoutController < ApplicationController
  def index
    @paquete = { }
    if params[:paquete] == '1'
      @paquete[:nombre] = 'Básico'
      @paquete[:precio] = 49
      @paquete[:mexipuntos] = '250 + 25 gratis = 275'
    end
    if params[:paquete] == '2'
      @paquete[:nombre] = 'Premium'
      @paquete[:precio] = 99
      @paquete[:mexipuntos] = '500 + 100 gratis = 600'
    end
    if params[:paquete] == '3'
      @paquete[:nombre] = 'VIP'
      @paquete[:precio] = 199
      @paquete[:mexipuntos] = '1000 + 250 gratis = 1250'

    end

    @paquete[:id] = params[:paquete]

  end

  def create

    transaction = current_user.transactions.create(:paquete => params[:checkout][:paquete], :amount => params[:checkout][:amount], :status => 'not completed')


    case params[:checkout][:paquete_id]
    when "1"
      precio = 49
      puntos = 275
    when "2"
      precio = 99
      puntos = 600

    when "3"
      precio = 199
      puntos = 1250
    else
      precio = 0
      puntos = 0
    end

    options1 =                   { :body => {
        :user => 'mexilist',
        'CARD_NUM' => params[:checkout][:card_num],
        'CARD_OWN' => params[:checkout][:nombre] + ' ' + params[:checkout][:apellidos],
        'CARD_EXP_DT' => params[:checkout][:month] + params[:checkout][:year][2..3],
        'CARD_CVV' => params[:checkout][:cvv],
        'CARD_TYPE' => params[:checkout][:card_type].downcase,
        'ORD_ID' => transaction.id,
        'CUST_USER_ID' => current_user.id,
        'CUST_IP' => '12.12.12.12',
        'ORD_AMT' => '1',
        'PROD_DEL_CD' => 'REN',
        'ORD_CONCEPT' => 'mexipuntos',
        'CUST_EMAIL' => current_user.email,
        'CUST_FNAME' => params[:checkout][:nombre],
        'CUST_LNAME' => params[:checkout][:apellidos],
        'CUST_MNAME' => '_',
        'ebWEBSITE' => 'mexilist.com',
        'EBT_DEVICEPRINT' => 'TABLET',

        'CARD_AVS_ADDR' => 'Address',
        'CARD_AVS_ZIPCODE' => '11111',
        'CUST_PHONE' => '11111111',
        'CUST_WORK_PHONE' => '11111111',
        'CUST_ADDR1' => 'Address',
        'CUST_CITY' => 'ZAPOPAN',
        'CUST_STPR_CD' => 'JA',
        'CUST_CNTRY_CD' => 'MEX',
        'CUST_POSTAL_CD' => '11111',
        'EBT_PREVCUST' => 'N'
      }
    }



    #    httparty = HTTParty.post('https://banwire.com/api/1/payment/direct', options1)

    respond_to do |format|

      if true or httparty.response.code == '200'
        @card = nil

        current_user.cards.each{ |card| @card = card if BCrypt::Password.new(card.number) == params[:checkout][:card_num] }

        if @card.nil?
          card = current_user.cards.build
          card.number = BCrypt::Password.create(params[:checkout][:card_num])
          card.fname = params[:checkout][:nombre]
          card.lname = params[:checkout][:apellidos]
          card.card_type = params[:checkout][:card_type].downcase
          card.exp_date = params[:checkout][:month] + params[:checkout][:year][2..3]
          card.last_number = params[:checkout][:card_num][12..15]
          card.save
          @card = card
        end



        transaction.status = 'success'
        transaction.card_id = @card.id
        # transaction.banwire_id = httparty.parsed_response['ID']
        # transaction.card_number = httparty.parsed_response['CARD']
        # transaction.auth_code = httparty.parsed_response['AUTH_CODE']
        transaction.mexipuntos = puntos
        transaction.save

        current_user.update_attribute(:mexipuntos, current_user.mexipuntos + puntos)
        format.html { redirect_to anuncios_user_url(current_user), notice: 'Compra exitosa.' }

      end
    end

  end

end
