<?php

namespace App\Tests;

use Illuminate\Http\Response;
use Tests\TestCase;

class VehicleTest extends TestCase
{
    public function testCreate()
    {
        $vehicle = $this->getJsonFixture('VehicleTest', 'create_vehicle.json');

        $response = $this->json('POST', '/vehicles', $vehicle);

        $this->assertEquals($response->status(),  Response::HTTP_OK);
    }

    public function testUpdate()
    {
        $vehicle = $this->getJsonFixture('VehicleTest', 'update_vehicle.json');

        $response = $this->json('PUT', '/vehicles/1', $vehicle);

        $this->assertEquals($response->status(),  Response::HTTP_NO_CONTENT);
    }

    public function testDelete()
    {
        $response = $this->json('DELETE', '/vehicles/1');

        $this->assertEquals($response->status(),  Response::HTTP_OK);
    }

    public function testSearch()
    {
        $response = $this->json('GET', '/vehicles');

        $actual = $response->json();

        $expected = $this->getJsonFixture('VehicleTest', 'search_vehicle.json');

        $this->assertEquals($actual, $expected);

        $this->assertEquals($response->status(), Response::HTTP_OK);
    }
}