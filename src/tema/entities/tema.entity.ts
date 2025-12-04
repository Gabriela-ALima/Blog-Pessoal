import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";

@Entity({name:'tb_temas'})
export class Tema{
    @PrimaryGeneratedColumn()
    id:number;

    @IsNotEmpty()
    @Column({length: 255, nullable:false})
    describle:string;

    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    postagem: Postagem[]
}