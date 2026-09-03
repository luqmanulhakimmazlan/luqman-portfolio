<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
{
    Schema::create('projects', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->string('slug')->unique();
        $table->text('short_description');
        $table->longText('description');
        $table->string('role')->nullable();
        $table->date('project_date')->nullable();
        $table->string('github_url')->nullable();
        $table->string('live_url')->nullable();
        $table->string('thumbnail')->nullable();
        $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
        $table->boolean('featured')->default(false);
        $table->integer('sort_order')->default(0);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
