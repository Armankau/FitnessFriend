class UsersController < ApplicationController

    def create
        user = User.create(user_params)
        if user.valid?
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end
    
# keeps them logged in 
    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: :ok
        else
            render json: {error: "not authorized"}, status: :unauthorized
        end
    end

    private
    def user_params
        params.permit(:username, :password_digest, :age, :sex, :calories_goal)
    end
end
