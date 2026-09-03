<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
{
    Schema::create('certificates', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->string('issuer');
        $table->date('issue_date');
        $table->date('expiry_date')->nullable();
        $table->string('credential_id')->nullable();
        $table->string('credential_url')->nullable();
        $table->string('image_url')->nullable();
        $table->text('description')->nullable();
        $table->integer('sort_order')->default(0);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
