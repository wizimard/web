<?php

use \Illuminate\Http\Response;
use Tests\TestCase;

class PizzaTest extends TestCase
{
    public function testCreate()
    {
		$pizza = $this->getJsonFixture('PizzaTest', 'create_pizza.json');

        $response = $this->json('post', '/pizza', $pizza);

        $response->assertStatus(Response::HTTP_OK);
    }

    public function testUpdate()
    {
        $pizza = $this->getJsonFixture('PizzaTest', 'update_pizza.json');

        $response = $this->json('put', '/pizza/1', $pizza);

        $response->assertStatus(Response::HTTP_NO_CONTENT);
    }

    public function testDelete()
    {
        $response = $this->json('delete', '/pizza/1');

        $response->assertStatus(Response::HTTP_OK);
    }

    public function testGet()
    {
        $actual = $this->json('get', '/pizza/1');

        $expected = $this->getJsonFixture('PizzaTest', 'get_pizza.json');

        $this->assertEquals($expected, $actual->json());
    }

    public function testSearch()
    {
        $actual = $this->json('get', '/pizza');

        $expected = $this->getJsonFixture('PizzaTest', 'search_pizza.json');

        $this->assertEquals($expected, $actual->json());
	}
}
