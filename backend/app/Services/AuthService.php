<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Tymon\JWTAuth\JWTAuth;

class AuthService
{
    use AuthenticatesUsers;

    protected $auth;
    protected $userModel;

    public function __construct()
    {
        $this->auth = app(JWTAuth::class);

        $this->userModel = app(User::class);
    }

    public function login($data)
    {
        $credentials = $this->credentials($data);
        $token = $this->auth->attempt($credentials);

        if ($token === false) {
            return false;
        }

        $user = $this->userModel->where('email', $data['email'])->first();

        return [
            'token' => $token,
            'ttl' => config('jwt.ttl'),
            'refresh_ttl' => config('jwt.refresh_ttl'),
            'user' => $user
        ];
    }

    public function exist($email)
    {
        return !empty($this->userModel->where('email', $email)->first());
    }

    public function createUser($data)
    {
        $this->userModel->insert([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt('test')
        ]);
    }

    public function getSocialUser($email)
    {
        $user = $this->userModel->where('email', $email)->first();
        $token = \Tymon\JWTAuth\Facades\JWTAuth::fromUser($user);

        return [
            'token' => $token,
            'ttl' => config('jwt.ttl'),
            'refresh_ttl' => config('jwt.refresh_ttl'),
            'user' => $user
        ];
    }
}
