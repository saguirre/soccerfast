import { classNames } from '@utils';

interface Entity {
  id: number;
  value: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  entityClass?: string;
  iconClass?: string;
}

interface Props {
  entities?: Entity[];
}

export const ContactInfo: React.FC<Props> = ({ entities }) => {
  return (
    <div>
      {entities?.map((entity: Entity) => (
        <dd
          key={entity.id}
          className={classNames(
            entity?.entityClass?.length ? entity.entityClass : '',
            'flex text-base text-sky-50 flex-row items-center'
          )}
        >
          <entity.icon
            className={entity?.iconClass?.length ? entity?.iconClass : 'flex-shrink-0 w-5 h-5 text-slate-400'}
            aria-hidden="true"
          />
          <span className="ml-2">{entity.value}</span>
        </dd>
      ))}
    </div>
  );
};
