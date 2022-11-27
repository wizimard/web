<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Pizza extends Model
{
	use Notifiable;

	/**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'pizza';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'type', 'name', 'model', 'price'
    ];
}
