class User < ApplicationRecord
  validates :password, length: {minimum: 6, allow_nil: true}
  validates :email, :first_name, :last_name, :password_digest, :session_token, presence: true
  validates :email, :session_token, uniqueness: true

  attr_reader :password
  after_initialize :ensure_session_token!

  def Self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user
    return  user if user.is_password?(password)
    nil
  end

  def password=(password)
    @password = password 
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  private
  def ensure_session_token!
    self.session_token ||= SecureRandom.urlsafe_base64
  end


end
