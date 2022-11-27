<?php

namespace App\Services;

use App\Models\Pizza;
use Tymon\JWTAuth\JWTAuth;

class PizzaService
{
    protected $auth;
    protected $pizzaModel;

    public function __construct()
    {
        $this->auth = app(JWTAuth::class);

        $this->pizzaModel = app(Pizza::class);
    }
	public function create($data) {
		return $this->pizzaModel
			  ->create($data);
	}
	public function update($where, $data) {
		return $this->pizzaModel
			  ->where($where)
			  ->update($data);
	}
	public function get($id) {
		return $this->pizzaModel
			  ->where(['id' => $id])
			  ->first()->toArray();
	}
	public function delete($id) {
		return $this->pizzaModel
			  ->where(['id' => $id])
			  ->delete();
	}
	public function search() {
			return $this->pizzaModel
					->all()
					->toArray();
	}

	public function exists($where) {
			return $this->pizzaModel
					->where($where)
					->exists();
	}
}
