<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\KodeVoucher;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    public function tamu(Request $request)
    {
        $reedem = KodeVoucher::all();
        $reedemArray = array();
        foreach ($reedem as $rdm) {
            array_push($reedemArray, $rdm->reward);
        }
        return response()->json([
            'status' => 200,
            'reedem' => $reedemArray,
            'message' => 'Logged In Successfully!',
        ]);
    }
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191|min:4',
            'email' => 'required|email|max:191',
            'password' => 'required|min:4',
            'password_confirmation' => 'required|min:4',
        ]);
        $user = User::where('email', $request->email)->first();
        if ($user) {
            return response()->json([
                'status' => 500,
                'validation_errors' => 'e-mail has been registered!',
            ]);
        } else {

            if ($validator->fails()) {
                return response()->json([
                    'validation_errors' => $validator->errors(),
                ]);
            } else {
                if ($request->password === $request->password_confirmation) {

                    $user = User::create([
                        'name' => $request->name,
                        'email' => $request->email,
                        'password' => Hash::make($request->password),
                    ]);
                    $userRole = Role::where('name', 'user')->first();
                    $user->attachRole($userRole);
                    $reedem = KodeVoucher::all();
                    $reedemArray = array();
                    foreach ($reedem as $rdm) {
                        array_push($reedemArray, $rdm->reward);
                    }

                    $token = $user->createToken($user->email . '_Token')->plainTextToken;
                    return response()->json([
                        'status' => 200,
                        'role' => sha1('role-is' . 'user'),
                        'id' => sha1($user->name),
                        'username' => $user->name,
                        'email' => $user->email,
                        'token' => $token,
                        'reedem' => $reedemArray,
                        'message' => 'Logged In Successfully!',
                    ]);
                } else {

                    return response()->json([
                        'status' => 201,
                        'validation_errors' => 'Password not match!',
                    ]);
                }
            }
        }
    }
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|max:191',
            'password' => 'required|max:30|min:5',
        ]);
        if ($validator->fails()) {

            return response()->json([
                'status' => 202,
                'validation_error' => $validator->errors(),
            ]);
        } else {
            $user = User::where('email', $request->email)->first();

            if (!$user || Hash::check($request->email, $user->email)) {

                return response()->json([
                    'status' => 102,
                    'validation_error' => 'Your email is not registered!',
                ]);
            }

            if (!$user || !Hash::check($request->password, $user->password)) {

                return response()->json([
                    'status' => 101,
                    'validation_error' => 'Your password is wrong!',
                ]);
            }
            if ($user || !Hash::check($request->password, $user->password)) {
                $token = $user->createToken($user->email . '_Token')->plainTextToken;

                $user->hasRole('admin') && $role = 'admin';
                $user->hasRole('user') && $role = 'user';
                $reedem = KodeVoucher::all();
                $reedemArray = array();
                foreach ($reedem as $rdm) {
                    array_push($reedemArray, $rdm->reward);
                }

                return response()->json([
                    'status' => 200,
                    'role' => sha1('role-is' . $role),
                    'id' => sha1($user->name),
                    'username' => $user->name,
                    'email' => $user->email,
                    'token' => $token,
                    'reedem' => $reedemArray,
                    'message' => 'Logged In Successfully!',
                ]);
            }
        }
    }
    public function logout()
    {
        if (Auth::user()->token) {

            Auth::user()->tokens->each(function ($token, $key) {
                $token->delete();
            });
            return response()->json([
                'status' => 200,
                'message' => 'Logout successfully',
            ]);
        } else {
            return response()->json([
                'status' => 419,
                'message' => 'Logout successfully',
            ]);
        }
    }
}
