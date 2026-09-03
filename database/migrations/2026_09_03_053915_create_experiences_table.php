<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
{
    Schema::create('experiences', function (Blueprint $table) {
        $table->id();
        $table->string('company');
        $table->string('position');
        $table->string('location');
        $table->string('employment_type');
        $table->date('start_date');
        $table->date('end_date')->nullable();
        $table->text('description');
        $table->string('logo')->nullable();
        $table->integer('sort_order')->default(0);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
