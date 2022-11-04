<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\PendaftaranController;
use App\Http\Controllers\ReedemController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('tamu', [AuthController::class, 'tamu']);
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::get('view', [PendaftaranController::class, 'view']);
Route::get('reedem/get', [ReedemController::class, 'index']);
Route::post('reedem/check', [ReedemController::class, 'cekReedem']);
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('reward/get', [ReedemController::class, 'showRewardByUser']);
    Route::post('reedem/store', [ReedemController::class, 'store']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('pendaftaran/store', [PendaftaranController::class, 'store']);
});
