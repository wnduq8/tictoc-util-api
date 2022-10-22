import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import { IsNotEmpty, IsNumber } from 'class-validator'

export abstract class CommonEntity {
  @IsNumber()
  @IsNotEmpty()
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date | null

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date | null
}
