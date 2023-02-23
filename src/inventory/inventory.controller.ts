import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Model, Specs } from '../model';
import { Recaptcha } from '@nestlab/google-recaptcha';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @ApiHeader({
    name: 'recaptcha',
    description: 'Custom header',
    required: true,
  })
  @Recaptcha()
  @ApiOperation({ summary: 'List all supported manufacturers' })
  @ApiResponse({
    status: 200,
    description: 'The list of supported manufacturers',
    type: [String],
  })
  @Get('/manufacturers')
  getManufacturers() {
    // Simply return the array of supported manufacturers
    return this.inventoryService.getAllManufacturers();
  }

  @ApiHeader({
    name: 'recaptcha',
    description: 'Custom header',
    required: true,
  })
  @Recaptcha()
  @ApiOperation({ summary: 'List all models for the specified manufacturer' })
  @ApiResponse({
    status: 200,
    description: 'The list of models for the specified manufacturer',
    type: [Model],
  })
  @Get('/models/:manufacturerName')
  async getModels(@Param('manufacturerName') manufacturerName: string) {
    // Retrieve the models for the specified manufacturer
    const models = await this.inventoryService.getModelsForManufacturer(
      manufacturerName,
    );

    // If no models were found, return a 404 error
    if (!models) {
      throw new NotFoundException(
        `No models found for manufacturer ${manufacturerName}`,
      );
    }

    // Otherwise, return the list of models
    return models;
  }

  @ApiHeader({
    name: 'recaptcha',
    description: 'Custom header',
    required: true,
  })
  @Recaptcha()
  @ApiOperation({
    summary: 'List technical specs for the specified model and manufacturer',
  })
  @ApiResponse({
    status: 200,
    description: 'The technical specs for the specified model and manufacturer',
    type: Specs,
  })
  @Get('/specs/:manufacturerName/:modelCode')
  async getSpecs(
    @Param('manufacturerName') manufacturerName: string,
    @Param('modelCode') modelCode: string,
  ) {
    // Retrieve the technical specs for the specified model and manufacturer
    const specs = await this.inventoryService.getSpecsForModel(
      manufacturerName,
      modelCode,
    );

    // If no specs were found, return a 404 error
    if (!specs) {
      throw new NotFoundException(
        `No specs found for model ${modelCode} and manufacturer ${manufacturerName}`,
      );
    }

    // Otherwise, return the technical specs
    return specs;
  }
}
