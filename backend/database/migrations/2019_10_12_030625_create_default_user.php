<?php

use Illuminate\Database\Migrations\Migration;
use \App\Models\User;

class CreateDefaultUser extends Migration
{
    public function up()
    {
        $this->createUser();
    }

    public function down()
    {

    }

    public function createUser()
    {
        User::create([
            'email' => 'admin@projectz.com',
            'password' => bcrypt('password123456'),
            'name' => 'admin project-z'
        ]);
    }
}
