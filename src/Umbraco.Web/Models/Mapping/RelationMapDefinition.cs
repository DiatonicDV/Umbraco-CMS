﻿using System.Linq;
using Umbraco.Core;
using Umbraco.Core.Mapping;
using Umbraco.Core.Models;
using Umbraco.Core.Services;
using Umbraco.Web.Models.ContentEditing;

namespace Umbraco.Web.Models.Mapping
{
    internal class RelationMapDefinition : IMapDefinition
    {
        private readonly IEntityService _entityService;
        private readonly IRelationService _relationService;

        public RelationMapDefinition(IEntityService entityService, IRelationService relationService)
        {
            _entityService = entityService;
            _relationService = relationService;
        }

        public void DefineMaps(UmbracoMapper mapper)
        {
            mapper.Define<IRelationType, RelationTypeDisplay>((source, context) => new RelationTypeDisplay(), Map);
            mapper.Define<IRelation, RelationDisplay>((source, context) => new RelationDisplay(), Map);
            mapper.Define<RelationTypeSave, IRelationType>(Map);
        }

        // Umbraco.Code.MapAll -Icon -Trashed -AdditionalData
        // Umbraco.Code.MapAll -ParentId -Notifications
        private void Map(IRelationType source, RelationTypeDisplay target, MapperContext context)
        {
            target.ChildObjectType = source.ChildObjectType;
            target.Id = source.Id;
            target.IsBidirectional = source.IsBidirectional;
            target.Key = source.Key;
            target.Name = source.Name;
            target.Alias = source.Alias;
            target.ParentObjectType = source.ParentObjectType;
            target.Udi = Udi.Create(Constants.UdiEntityType.RelationType, source.Key);
            target.Path = "-1," + source.Id;

            // Set the "friendly" and entity names for the parent and child object types
            if (source.ParentObjectType.HasValue)
            {
                var objType = ObjectTypes.GetUmbracoObjectType(source.ParentObjectType.Value);
                target.ParentObjectTypeName = objType.GetFriendlyName();
            }

            if (source.ChildObjectType.HasValue)
            {
                var objType = ObjectTypes.GetUmbracoObjectType(source.ChildObjectType.Value);
                target.ChildObjectTypeName = objType.GetFriendlyName();
            }

            // Load the relations

            var relations = _relationService.GetByRelationTypeId(source.Id);
            var displayRelations = context.MapEnumerable<IRelation, RelationDisplay>(relations);

            // Load the entities
            var entities = _relationService.GetEntitiesFromRelations(relations)
                .ToDictionary(x => (x.Item1.Id, x.Item2.Id), x => x);

            foreach(var r in displayRelations)
            {
                var pair = entities[(r.ParentId, r.ChildId)];
                var parent = pair.Item1;
                var child = pair.Item2;

                r.ChildName = child.Name;
                r.ParentName = parent.Name;
            }

            target.Relations = displayRelations;

        }

        // Umbraco.Code.MapAll -ParentName -ChildName
        private void Map(IRelation source, RelationDisplay target, MapperContext context)
        {
            target.ChildId = source.ChildId;
            target.Comment = source.Comment;
            target.CreateDate = source.CreateDate;
            target.ParentId = source.ParentId;
        }

        // Umbraco.Code.MapAll -CreateDate -UpdateDate -DeleteDate
        private static void Map(RelationTypeSave source, IRelationType target, MapperContext context)
        {
            target.Alias = source.Alias;
            target.ChildObjectType = source.ChildObjectType;
            target.Id = source.Id.TryConvertTo<int>().Result;
            target.IsBidirectional = source.IsBidirectional;
            target.Key = source.Key;
            target.Name = source.Name;
            target.ParentObjectType = source.ParentObjectType;
        }
    }
}
