<?php

use \Illuminate\Http\Response;
use Tests\TestCase;

class AuthTest extends TestCase
{
    public function testLogin()
    {
        $user = [
            'email' => 'admin@projectz.com',
            'password' => 'password123456'
        ];

        $response = $this->json('post', '/login', $user);

        $response->assertStatus(Response::HTTP_OK);
    }

    public function testLoginWithWrongPassword()
    {
        $user = [
            'email' => 'admin@projectz.com',
            'password' => 'password'
        ];

        $response = $this->json('post', '/login', $user);

        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }

    public function testLoginMissingUser()
    {
        $user = [
            'email' => 'admin@project.com',
            'password' => 'password123456'
        ];

        $response = $this->json('post', '/login', $user);

        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }
}