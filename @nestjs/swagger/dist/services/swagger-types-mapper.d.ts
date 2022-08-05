/// <reference types="lodash" />
import { ApiPropertyOptions } from '../decorators';
import { BaseParameterObject, ReferenceObject, SchemaObject } from '../interfaces/open-api-spec.interface';
import { ParamWithTypeMetadata } from './parameter-metadata-accessor';
export declare class SwaggerTypesMapper {
    private readonly keysToRemove;
    mapParamTypes(parameters: Array<ParamWithTypeMetadata | BaseParameterObject>): (Partial<BaseParameterObject> | Partial<ParamWithTypeMetadata> | {
        schema: {
            type: string;
            items: any;
            nullable?: boolean;
            discriminator?: import("../interfaces/open-api-spec.interface").DiscriminatorObject;
            readOnly?: boolean;
            writeOnly?: boolean;
            xml?: import("../interfaces/open-api-spec.interface").XmlObject;
            externalDocs?: import("../interfaces/open-api-spec.interface").ExternalDocumentationObject;
            example?: any;
            examples?: any[] | Record<string, any>;
            deprecated?: boolean;
            allOf?: (SchemaObject | ReferenceObject)[];
            oneOf?: (SchemaObject | ReferenceObject)[];
            anyOf?: (SchemaObject | ReferenceObject)[];
            not?: SchemaObject | ReferenceObject;
            properties?: Record<string, SchemaObject | ReferenceObject>;
            additionalProperties?: boolean | SchemaObject | ReferenceObject;
            patternProperties?: any;
            description?: string;
            format?: string;
            default?: any;
            title?: string;
            multipleOf?: number;
            maximum?: number;
            exclusiveMaximum?: boolean;
            minimum?: number;
            exclusiveMinimum?: boolean;
            maxLength?: number;
            minLength?: number;
            pattern?: string;
            maxItems?: number;
            minItems?: number;
            uniqueItems?: boolean;
            maxProperties?: number;
            minProperties?: number;
            required?: string[];
            enum?: any[];
        };
    } | {
        schema: import("lodash").Dictionary<any>;
        description?: string;
        required?: boolean;
        deprecated?: boolean;
        allowEmptyValue?: boolean;
        style?: import("../interfaces/open-api-spec.interface").ParameterStyle;
        explode?: boolean;
        allowReserved?: boolean;
        examples?: Record<string, ReferenceObject | import("../interfaces/open-api-spec.interface").ExampleObject>;
        example?: any;
        content?: import("../interfaces/open-api-spec.interface").ContentObject;
    } | {
        schema: import("lodash").Dictionary<any>;
        name?: string | number | object;
        type?: import("@nestjs/common").Type<unknown>;
        in?: import("../interfaces/open-api-spec.interface").ParameterLocation | "body" | "placeholder";
        isArray?: boolean;
        required?: true;
        enum?: unknown[];
        enumName?: string;
    })[];
    mapTypeToOpenAPIType(type: string | Function): string;
    mapEnumArrayType(param: Record<string, any>, keysToRemove: Array<keyof ApiPropertyOptions | '$ref'>): {
        schema: {
            type: string;
            items: any;
            nullable?: boolean;
            discriminator?: import("../interfaces/open-api-spec.interface").DiscriminatorObject;
            readOnly?: boolean;
            writeOnly?: boolean;
            xml?: import("../interfaces/open-api-spec.interface").XmlObject;
            externalDocs?: import("../interfaces/open-api-spec.interface").ExternalDocumentationObject;
            example?: any;
            examples?: any[] | Record<string, any>;
            deprecated?: boolean;
            allOf?: (SchemaObject | ReferenceObject)[];
            oneOf?: (SchemaObject | ReferenceObject)[];
            anyOf?: (SchemaObject | ReferenceObject)[];
            not?: SchemaObject | ReferenceObject;
            properties?: Record<string, SchemaObject | ReferenceObject>;
            additionalProperties?: boolean | SchemaObject | ReferenceObject;
            patternProperties?: any;
            description?: string;
            format?: string;
            default?: any;
            title?: string;
            multipleOf?: number;
            maximum?: number;
            exclusiveMaximum?: boolean;
            minimum?: number;
            exclusiveMinimum?: boolean;
            maxLength?: number;
            minLength?: number;
            pattern?: string;
            maxItems?: number;
            minItems?: number;
            uniqueItems?: boolean;
            maxProperties?: number;
            minProperties?: number;
            required?: string[];
            enum?: any[];
        };
    };
    mapArrayType(param: (ParamWithTypeMetadata & SchemaObject) | BaseParameterObject, keysToRemove: Array<keyof ApiPropertyOptions | '$ref'>): {
        schema: {
            type: string;
            items: import("lodash").Dictionary<any>;
            nullable?: boolean;
            discriminator?: import("../interfaces/open-api-spec.interface").DiscriminatorObject;
            readOnly?: boolean;
            writeOnly?: boolean;
            xml?: import("../interfaces/open-api-spec.interface").XmlObject;
            externalDocs?: import("../interfaces/open-api-spec.interface").ExternalDocumentationObject;
            example?: any;
            examples?: any[] | Record<string, any>;
            deprecated?: boolean;
            allOf?: (SchemaObject | ReferenceObject)[];
            oneOf?: (SchemaObject | ReferenceObject)[];
            anyOf?: (SchemaObject | ReferenceObject)[];
            not?: SchemaObject | ReferenceObject;
            properties?: Record<string, SchemaObject | ReferenceObject>;
            additionalProperties?: boolean | SchemaObject | ReferenceObject;
            patternProperties?: any;
            description?: string;
            format?: string;
            default?: any;
            title?: string;
            multipleOf?: number;
            maximum?: number;
            exclusiveMaximum?: boolean;
            minimum?: number;
            exclusiveMinimum?: boolean;
            maxLength?: number;
            minLength?: number;
            pattern?: string;
            maxItems?: number;
            minItems?: number;
            uniqueItems?: boolean;
            maxProperties?: number;
            minProperties?: number;
            required?: string[];
            enum?: any[];
        };
        description?: string;
        required?: boolean;
        deprecated?: boolean;
        allowEmptyValue?: boolean;
        style?: import("../interfaces/open-api-spec.interface").ParameterStyle;
        explode?: boolean;
        allowReserved?: boolean;
        examples?: Record<string, ReferenceObject | import("../interfaces/open-api-spec.interface").ExampleObject>;
        example?: any;
        content?: import("../interfaces/open-api-spec.interface").ContentObject;
    } | {
        schema: {
            type: string;
            items: import("lodash").Dictionary<any>;
            nullable?: boolean;
            discriminator?: import("../interfaces/open-api-spec.interface").DiscriminatorObject;
            readOnly?: boolean;
            writeOnly?: boolean;
            xml?: import("../interfaces/open-api-spec.interface").XmlObject;
            externalDocs?: import("../interfaces/open-api-spec.interface").ExternalDocumentationObject;
            example?: any;
            examples?: any[] | Record<string, any>;
            deprecated?: boolean;
            allOf?: (SchemaObject | ReferenceObject)[];
            oneOf?: (SchemaObject | ReferenceObject)[];
            anyOf?: (SchemaObject | ReferenceObject)[];
            not?: SchemaObject | ReferenceObject;
            properties?: Record<string, SchemaObject | ReferenceObject>;
            additionalProperties?: boolean | SchemaObject | ReferenceObject;
            patternProperties?: any;
            description?: string;
            format?: string;
            default?: any;
            title?: string;
            multipleOf?: number;
            maximum?: number;
            exclusiveMaximum?: boolean;
            minimum?: number;
            exclusiveMinimum?: boolean;
            maxLength?: number;
            minLength?: number;
            pattern?: string;
            maxItems?: number;
            minItems?: number;
            uniqueItems?: boolean;
            maxProperties?: number;
            minProperties?: number;
            required?: string[];
            enum?: any[];
        };
        name?: string | number | object;
        type?: import("@nestjs/common").Type<unknown> & string;
        in?: import("../interfaces/open-api-spec.interface").ParameterLocation | "body" | "placeholder";
        isArray?: boolean;
        required?: true & string[];
        enum?: unknown[] & any[];
        enumName?: string;
        nullable?: boolean;
        discriminator?: import("../interfaces/open-api-spec.interface").DiscriminatorObject;
        readOnly?: boolean;
        writeOnly?: boolean;
        xml?: import("../interfaces/open-api-spec.interface").XmlObject;
        externalDocs?: import("../interfaces/open-api-spec.interface").ExternalDocumentationObject;
        example?: any;
        examples?: any[] | Record<string, any>;
        deprecated?: boolean;
        allOf?: (SchemaObject | ReferenceObject)[];
        oneOf?: (SchemaObject | ReferenceObject)[];
        anyOf?: (SchemaObject | ReferenceObject)[];
        not?: SchemaObject | ReferenceObject;
        items?: SchemaObject | ReferenceObject;
        properties?: Record<string, SchemaObject | ReferenceObject>;
        additionalProperties?: boolean | SchemaObject | ReferenceObject;
        patternProperties?: any;
        description?: string;
        format?: string;
        default?: any;
        title?: string;
        multipleOf?: number;
        maximum?: number;
        exclusiveMaximum?: boolean;
        minimum?: number;
        exclusiveMinimum?: boolean;
        maxLength?: number;
        minLength?: number;
        pattern?: string;
        maxItems?: number;
        minItems?: number;
        uniqueItems?: boolean;
        maxProperties?: number;
        minProperties?: number;
    };
    private getSchemaOptions;
    private isEnumArrayType;
    private hasSchemaDefinition;
    private omitParamKeys;
    private getSchemaOptionsKeys;
}
