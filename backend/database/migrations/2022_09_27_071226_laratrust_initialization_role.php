<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Role;
use App\Models\Permission;

class LaratrustInitializationRole extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $admin          =   Role::create([
            'name'          => 'admin',
        ]);
        $user          =   Role::create([
            'name'          => 'user',
        ]);

        $dashboard      = Permission::create([
            'name'          => 'dashboard-admin',
        ]);
        $user_permission     = Permission::create([
            'name'          => 'validator',
        ]);;

        $admin->attachPermissions([$dashboard, $user_permission]);
        $user->attachPermissions([$user_permission]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
