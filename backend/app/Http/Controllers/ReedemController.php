<?php

namespace App\Http\Controllers;

use App\Models\KodeVoucher;
use App\Models\Reward;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReedemController extends Controller
{
    public function index()
    {
        $reedemDB = KodeVoucher::all();
        return $reedemDB;
    }
    public function showRewardByUser()
    {
        $reward = Reward::where('user_id', auth('sanctum')->user()->id)->get();
        return $reward;
    }
    public function cekReedem(Request $request)
    {
        if ($request->kode) {
            $reedemDB = KodeVoucher::where('reedem', $request->kode)->first();
            if ($reedemDB) {
                if ($reedemDB->jumlah > 0) {
                    $reedemDB->jumlah = $reedemDB->jumlah - 1;
                    $reedemDB->update();
                    $reward = new Reward();
                    $reward->user_id = auth('sanctum')->user()->id;
                    $reward->reedem = $reedemDB->reedem;
                    $reward->reward = $reedemDB->reward;
                    $reward->save();
                    return response()->json([
                        'status' => 200,
                        'reward' => $reedemDB->reward,
                        'messages' => 'Success',
                    ]);
                } else {
                    return response()->json([
                        'status' => 201,
                        'messages' => 'Sudah melebihi batas penukaran',
                    ]);
                }
            } else {
                return response()->json([
                    'status' => 101,
                    'messages' => 'Kode Voucher Salah!',
                ]);
            }
        } else {
            return response()->json([
                'status' => 102,
                'messages' => 'Kode Voucher error!',
            ]);
        }
    }
    public function store(Request $request)
    {

        $reedemDB =  KodeVoucher::all();
        foreach ($reedemDB as $db) {
            $db->delete();
        }

        if ($request->has('reedem')) {
            for ($i = 0; $i < count($request->reedem); $i++) {

                $insert = array(
                    'reedem'     => $request->reedem[$i],
                    'reward'     => $request->reward[$i],
                    'jumlah'     => $request->jumlah[$i],
                );
                $insert_data[] = $insert;
            }
            KodeVoucher::insert($insert_data);
        }

        return response()->json([
            'status' => 200,
            'messages' => 'Success',
        ]);
    }
}
